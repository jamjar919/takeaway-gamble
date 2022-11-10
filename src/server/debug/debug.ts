import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import { validatePlaceToEatUrl } from "../gamble/get-restaurant-data/url/deliverooMenuUrlCache";
import { getDeliverooContextFromUrl } from "../gamble/getDeliverooContextFromUrl";

export const debug = async (req: Request, res: Response) => {
  try {
    console.log(req.query);

    const url = req.query["url"];

    if (typeof url !== "string") {
      sendJSON({ error: "Pass in a URL as a param" }, res);
      return;
    }

    if (!validatePlaceToEatUrl(url as string)) {
      sendJSON({ error: "URL not valid" }, res);
      return;
    }

    const response = await getDeliverooContextFromUrl(url as string);

    sendJSON(
      {
        response,
      },
      res
    );
  } catch (e: any) {
    console.error("Error debug", e);
    sendJSON({ error: e?.message || "Error" }, res);
  }
};
