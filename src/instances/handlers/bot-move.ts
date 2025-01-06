import { Request, Response } from "express";
import { ArrangementModel } from "../../models/arrangement";

const botMove = () => {
    return async (req: Request, res: Response) => {
        const { private: privateState, shared: sharedState } = req.body;

        for (const playerData of privateState) {
            if (playerData.output !== null) {
                const arrangement = await ArrangementModel.findOne({
                    playerId: playerData.playerId,
                    hash: BigInt(playerData.input_hash),
                    $nor: [{ cards: null }],
                }).exec();

                let arrangementId;
                if (!arrangement) {
                    const newArrangement = await ArrangementModel.create({
                        playerId: playerData.playerId,
                        hash: BigInt(playerData.input_hash),
                        cards: {
                            segment_1: playerData.output.segment_1,
                            segment_2: playerData.output.segment_2,
                            segment_3: playerData.output.segment_3,
                        },
                    });
                    arrangementId = newArrangement._id.toString();
                } else {
                    arrangementId = arrangement._id.toString();
                }

                const playerIndex = privateState.indexOf(playerData);
                privateState[playerIndex].arrangement_id = arrangementId;
                sharedState.is_have_output[playerIndex] = true;
            }
        }

        res.send({
            private: privateState,
            shared: sharedState,
        });
    };
};

export default botMove;
