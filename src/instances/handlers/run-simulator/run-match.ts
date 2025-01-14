import { Hand, Settlement } from "@rd/pusoy-rules";
import { IContext } from "../../../interfaces";
import { RealMatchesModel } from "../../../models/real-matches";
import { RealSettlementModel } from "../../../models/real-settlement";
import { getPlayerArrangement } from "./get-player-arrangement";
import { Types } from "mongoose";

export const runMatch = async (
    context: IContext & { _id: Types.ObjectId },
    botId: string,
    botUrl: string,
    settle: (hands: Hand<number[]>[]) => Settlement[],
) => {
    const realMatch = await RealMatchesModel.findOne({
        syncId: context.matchId,
    }).exec();

    if (!realMatch) {
        throw new Error("Match not found");
    }

    const inputMap = context.hashSlots.reduce((acc, hashSlot, index) => {
        acc[hashSlot] = realMatch.inputs[index];
        return acc;
    }, {} as Record<number, number[]>);

    const hands = await Promise.all(
        context.playerIds.map((playerId, index) =>
            getPlayerArrangement(
                playerId,
                botId,
                context.hashSlots[index],
                inputMap[context.hashSlots[index]],
                botUrl,
            ),
        ),
    );

    const handMap = hands.reduce((acc, hand) => {
        acc[hand.hashSlot] = hand;
        return acc;
    }, {} as Record<number, (typeof hands)[0]>);

    const input = realMatch.hashSlots.map((hashSlot) => handMap[hashSlot].hand);
    const arrangementIds = realMatch.hashSlots.map(
        (hashSlot) => handMap[hashSlot].arrangementId,
    );
    const playerIds = realMatch.hashSlots.map(
        (hashSlot) => handMap[hashSlot].playerId,
    );

    const output = settle(input);

    const settlement = await RealSettlementModel.updateOne(
        {
            ref: {
                contextId: context._id.toString(),
                botId: botId,
            },
        },
        {
            $set: {
                matchId: context.matchId,
                playerIds,
                arrangementIds,
                scores: output,
                hashSlot: realMatch.hashSlots,
            },
        },
        {
            upsert: true,
        },
    ).exec();

    return {
        hands,
        output,
        arrangementIds,
        settlementId: settlement.upsertedId?.toString(),
    };
};
