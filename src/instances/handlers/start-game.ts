import { Request, Response } from "express";
import { MatchModel } from "../../models/match";
import { ArrangementModel } from "../../models/arrangement";
import { GameStartRequest } from "../../types";

const startGame = () => {
    return async (req: Request<{}, {}, GameStartRequest>, res: Response) => {
        const playerIds = req.body.players;

        const indexMatch = req.body.offset + req.body.processed + 1;

        const rawMatch = await MatchModel.findOne({
            id: indexMatch,
        }).exec();

        const hashSlotMap: Record<number, bigint> = {
            [0]: rawMatch?.hash_slot_1 || BigInt(0),
            [1]: rawMatch?.hash_slot_2 || BigInt(0),
            [2]: rawMatch?.hash_slot_3 || BigInt(0),
            [3]: rawMatch?.hash_slot_4 || BigInt(0),
        };

        const slotMap: Record<number, number[]> = {
            [0]: rawMatch?.slot_1 || [],
            [1]: rawMatch?.slot_2 || [],
            [2]: rawMatch?.slot_3 || [],
            [3]: rawMatch?.slot_4 || [],
        };

        const match = {
            id: rawMatch?.id,
            hash_slot_1: rawMatch?.hash_slot_1.toString(),
            hash_slot_2: rawMatch?.hash_slot_2.toString(),
            hash_slot_3: rawMatch?.hash_slot_3.toString(),
            hash_slot_4: rawMatch?.hash_slot_4.toString(),
        };

        const arrangements = await Promise.all(
            playerIds.map(async (playerId, i) => {
                return await ArrangementModel.findOne({
                    playerId,
                    hash: hashSlotMap[i],
                    $nor: [{ cards: null }],
                }).exec();
            }),
        );

        // Build private state for each player
        const privateState = playerIds.map((playerId, i) => {
            const segmentCards = arrangements[i]
                ? {
                      segment_1: arrangements[i].cards.segment_1,
                      segment_2: arrangements[i].cards.segment_2,
                      segment_3: arrangements[i].cards.segment_3,
                  }
                : null;

            return {
                player_id: playerId,
                input_hash: hashSlotMap[i].toString(),
                input: slotMap[i] || [],
                arrangement_id: arrangements[i]?._id?.toString() || "",
                output: segmentCards,
            };
        });

        const sharedState = {
            match: match,
            is_have_output: privateState.map(
                (player) => player.output !== null,
            ),
        };

        res.send({
            private: privateState,
            shared: sharedState,
        });
    };
};

export default startGame;
