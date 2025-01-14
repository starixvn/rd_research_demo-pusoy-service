import { RealArrangementModel } from "../../../models/real-arrangement";
import { fetchBotArrangement } from "./fetch-bot-arrangement";

export const getPlayerArrangement = async (
    playerId: string,
    botId: string,
    hashSlot: number,
    input: number[],
    botUrl: string,
) => {
    const realArrangement = await RealArrangementModel.findOne({
        hashSlot,
        playerId,
    });

    if (playerId === "x") {
        if (!realArrangement) {
            const hand = await fetchBotArrangement(
                playerId,
                hashSlot,
                input,
                botUrl,
            );
            const arrangement = await RealArrangementModel.create({
                hashSlot,
                playerId: botId,
                output: hand,
            });

            return {
                arrangementId: arrangement._id.toString(),
                playerId: botId,
                hand,
                hashSlot,
            };
        }
        return {
            arrangementId: realArrangement._id.toString(),
            playerId: botId,
            hand: realArrangement.output,
            hashSlot,
        };
    }

    if (!realArrangement) {
        throw new Error("Real arrangement not found");
    }

    return {
        arrangementId: realArrangement._id.toString(),
        playerId,
        hand: realArrangement.output,
        hashSlot,
    };
};
