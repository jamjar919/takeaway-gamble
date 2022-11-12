import { Request, Response } from "express";
import { sendJSON } from "../util/sendJSON";
import { validatePlaceToEatUrl } from "../gamble/deliveroo/get-restaurant-data/url/deliverooMenuUrlCache";
import { getDeliverooRestaurantContextFromUrl } from "../gamble/deliveroo/deliveroo-state-retriever/getDeliverooRestaurantContextFromUrl";

export const debugRestaurantContext = async (req: Request, res: Response) => {
  try {
    const url = req.query["url"];

    if (typeof url !== "string") {
      sendJSON({ error: "Pass in a URL as a param" }, res);
      return;
    }

    if (!validatePlaceToEatUrl(url as string)) {
      sendJSON({ error: "URL not valid" }, res);
      return;
    }

    const response = await getDeliverooRestaurantContextFromUrl(url as string);

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
