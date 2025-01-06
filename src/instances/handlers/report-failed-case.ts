import { FailedCaseModel } from "../../models/failed-case";
import { Request, Response } from "express";

const reportFailedCase = () => {
    return async (req: Request, res: Response) => {
        const failedCase = req.body;
        const result = await FailedCaseModel.create(failedCase);
        res.send("Save success: " + JSON.stringify(result));
    };
};

export default reportFailedCase;
