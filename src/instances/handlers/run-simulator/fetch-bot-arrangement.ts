import { convertRawHand } from "./convert-raw-hand";

export const fetchBotArrangement = async (
    playerId: string,
    hashSlot: number,
    input: number[],
    botUrl: string,
) => {
    const response = await fetch(botUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            private: {
                player_id: playerId,
                input_hash: hashSlot,
                input,
                arrangement_id: "",
                output: null,
            },
        }),
    });

    const solution = await response.json();
    return convertRawHand(solution.output);
};
