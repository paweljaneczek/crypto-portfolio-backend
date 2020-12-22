import * as R from "ramda";

const ETH_PLORER_IMAGE_URL = "https://ethplorer.io";

export const convertEthPlorerResult = (result: any) =>
  R.mergeRight(result, {
    tokens: R.map(
      (token: any) =>
        token.tokenInfo
          ? R.mergeDeepLeft(
              {
                tokenInfo: {
                  image: token.tokenInfo.image
                    ? `${ETH_PLORER_IMAGE_URL}${token.tokenInfo.image}`
                    : undefined,
                },
              },
              token,
            )
          : token,
      R.filter(
        token => token.tokenInfo && token.tokenInfo.symbol,
        result.tokens,
      ),
    ),
  });
