import { IReview } from "@appTypes/review";
import { IQuestion } from "@appTypes/question";

export interface IExtraInfo {
    descriptions: {
        origins?: string;
        howToCook?: string;
        features?: string;
        warranty?: string;
    };
    reviews: IReview[];
    questions: IQuestion[];
}
