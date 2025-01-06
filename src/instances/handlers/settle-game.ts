import { Request, Response } from "express";
import { GameStateModel, PlayerPrivateState } from "../../types";
import { Hand, Settlement } from "@rd/pusoy-rules";
import SettlementSimulation from "../../models/settlement-simulation";

const convertGameStateToSettleInput = (
    privateState: PlayerPrivateState,
): Hand<number[]> => {
    if (!privateState.output) {
        return {
            front: [],
            middle: [],
            back: [],
        };
    }

    return {
        front: privateState.output.segment_1,
        middle: privateState.output.segment_2,
        back: privateState.output.segment_3,
    };
};

const settleGame = (pusoy: {
    settle: (playerData: Hand<number[]>[]) => Settlement[];
}) => {
    return async (req: Request<{}, {}, GameStateModel>, res: Response) => {
        const { private: privateState, shared: sharedState } = req.body;

        const input = privateState.map(convertGameStateToSettleInput);

        const result = pusoy.settle(input);

        const settlementSimulation = new SettlementSimulation({
            match_id: sharedState.match.id,
            player_ids: privateState.map((player) => player.player_id),
            arrangement_ids: privateState.map(
                (player) => player.arrangement_id,
            ),
            scores: result,
        });

        await settlementSimulation.save();

        res.send({
            settlement_simulation_id: settlementSimulation.id,
        });
    };
};

export default settleGame;
