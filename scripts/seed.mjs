import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

// https://raw.githubusercontent.com/JosephJvB/gsheets-api/main/src/database/sheetClient.ts
let spreadsheetId = "156cZe81ntgR_2-dyfpv8l-n_Xq3o3hnBXNC6GiRv18s";
let sheetName = "plants";

const getClient = () => {
  // https://stackoverflow.com/questions/30400341/environment-variables-containing-newlines-in-node
  const privateKey = process.env.GOOGLE_SERVICEACCOUNT_private_key.replace(
    /\\n/g,
    "\n"
  );
  const authClient = new google.auth.GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/photoslibrary",
    ],
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_SERVICEACCOUNT_client_email,
    },
  });
  return google.sheets({
    version: "v4",
    auth: authClient,
  });
};

const day = 1000 * 60 * 60 * 24;
const week = day * 7;
const month = week * 4;

const rows = [
  [
    "slug",
    "plantName",
    "hydrationInterval",
    "foodInterval",
    "albumId",
    "imageUrl",
    "imageTS",
    "lastHydrated",
    "lastFed",
  ],
  [
    "zzplant",
    "Zanzibar Gem",
    Math.round(week * 3).toString(),
    Math.round(month).toString(),
    "AA6CZZinMUKhP9Mi20Z1EtRf5lvAJ2XrSbtxXdFRYEvZ0P3T7iDS5pnUtEcoGapCzStEv5vL8V9C",
    "https://lh3.googleusercontent.com/B410jwWVlNQ77UqjhoenteRtGF6taYOexisQwsFNPOo-EC0xtwQtUyHe7jPpNVQswe3z0v1buXLCtv_3oNteWbQFE5eLYsXlxYzDWkDlmh8-gTbisRuESuQkwRVqtjBHcO6vjATJUtR6N9yXagtop803fpQXDED_fxM8qTw1RuYORPJFCr7G6cPKLX2VWnHdRkmsuUan1TR_pTfh0tyIlnBTPoRCwgzhOG9HRt8D5HgJZzSaFCs2Qf9cA7vs42uc_Sk5GWM-coLJWubksmrcNs_It7jHRZz6pc5EXnNk69V-DGlt7alzqBclLvEPnYK1-oSjuRhFPYxUgoUZPDSrlZt6o6KM3eVQEcX3qZY9w8QvOEO7IKyed02VDR2DUIjf6qMcHb7ky39oV8Mb27N6CqfmDsdsC-B4zB9LvrXfdGMdbBOXFsAJm6pZBPhekRWDA8igVZeNZ2_4GsV2FrMrDwGfsGzAFcs8gfrDsbW7e6-N__NJ0f-dNZ_i0FYxAyZcniFxaIq4dJ6caOcjYi-57tx0O-WQtxYXkoUQPPATiRjctkTclbnEuiPaisI8ylozC-eOBwMLN_G8vCHgW8wryqa-5eMlo7_RoJ35hvzcGvTMpBFhr6GGFm_wu6yZG85oQK1vIeGeCnQSWRFrkpgcxFFZ5W6WIuHDeRHX00aG780tgkYkLl0DkxSlaLYgLcsx3SHgGfrxsvA5IqihTdZZcWf4FR9r7K8CnKYjwOLX3zxhC8qoPuuc23JxWiX9u5WeAsW0liiu9BU8cDrskzwPgyist8Zq0Y5ECWXEW7f20qCwsFqh_2fE8psOXVCwclTc46GzcF5Deg4XZHQOnotIKdkjWZf3XIwTupgLuQ4UY3jpH7FYHtQzSHbAj15ck8mm3F-N0mMkykPy8djsAsd1Ziw4VTW4AeIHaPIA9BGteQNHaHB787rOFEPgIssnoZHizfWmRtTBV_-diwwlGEyadpWhOkrnHuMP1LuewBTnDIlexQtO2vCIZBpfZA0zJ5s-9x4=w567-h756-s-no",
    "1684355180885",
    "1684761288620",
    "1684761288620",
  ],
  [
    "caladium",
    "Caladium Mix",
    Math.round(week / 2).toString(),
    Math.round(week * 2).toString(),
    "AA6CZZhByy-ihxrBvQjFtYr4VqZ91I0AYJI-IWiJUuus7arbQPERNRP4YasnW_s1YJ991HNySH6L",
    "https://lh3.googleusercontent.com/KqCpKuuCL-M0ITgE8oBbLGUnFSMAkxJKaMEtJVC3sat1k70gwEWoqeNuIAkJRoLixHeVWZgtTYVNC-55KKJQpBMNWYUYGnX3jKWFHajUwl85Bo4JOQrhKrfOtNCYq_qewKOMnOkAPdZKe6wnXMHMkTiAK8qaj7M5x6Axym606-fbMaGObS8op875_aL108f8_SoqF1oOAex8urWv_WXD60g7aahoCSgPa_FbxwwZPCaFDOorW0zsZjfkr0VCdIJQ8R2F_9zTK_xCHt4F1Dn_XOJIbcVLLltdNRf6qgD5JJZ5fi6zc9w-4-DT9YHnHVmOIpX5SpVFjClMCyrTRVRsXmMFoMToA249TcOeRRwN39BAObOkEoD8prX32Lt4Yvxw1gRUkecRBNiTm4rbGxywqIbUOvr0O6_JUw6fYNmDpGwq39L3GLUl9KVpQmvVAHmPpPIfx_UrhJfk78riAAZlUaU3rbwqNPLtyB5TvctA06jg4fhPNH7aGdxKlptIBUugCo0y2scZlhBwNmmlWXMGWasc7VFhEJQ3zBM-NTnk10OUL9ZOkUn6yomHLt4ch-6V_5Mx7Vh7_f22pt_INsMOf2VT88qr3fvIx6loWZWLjqnfg7m8d-TDMyw376UN0V8gCzEbrMqU1HsKsO65SSMrwUqyBgRkYn9lFZrk3fTFCQjKPSH6Br1u47DNfE9GbxEA9nEbc6tgNxQq3YsNyMtO-7VRQmitt51tKIyvH3GLcVh6kUAq8FVXRazVF8CytiaPFaQVhmQP7MoqCucGw0FNOumYP0dIob5_NGd67Zh0LTAwBOqHrDw2JU3Hg6O5KP8QIF79oF18apWUGuaJbQgvUfM0HcAMcRKzVHWI5aPPZuCdoEeDQgLaAhj2YELp-oVWmGQJ0eW33cuk934CTONKzun7kNDq-2d5y1L_mmgmkUpvjQduLN2TxE4sRVTeZ5tD9Snd57Y7SLRHaWUlrHBU80y8Q4NvE8Rwq_2fIwE8749IcxiUWs3iuJg=w165-h220-no",
    "1684355180885",
    "1684782149793",
    "1684782149793",
  ],
  [
    "snakeplant",
    "Snake Plant",
    Math.round(week * 2).toString(),
    Math.round(month * 2).toString(),
    "AA6CZZiLQjinC1etY4RV5AExXVKIG7-yFUhlk12x2PVUa591icXE3FVBRn1TeKo5eFoQqTxPFZm9",
    "https://lh3.googleusercontent.com/6wixX5Mb7Cn3ByflxeMn765Kt8PAVRojxCEouD4fmTkP1__tG8FqHR4CdKM3EXqc8anqkyAkTm7mDzsPbKHHDxeA-h1SyIGNqfBqMDiFU-mdiycGbNewgrvpseh0Evt-wuqzyW2NeOlUEx8t5zKY9Yt2hhvrhPi8MUr9xSnpCh6cDlILJS_jYYinwzQPFFLy3SnYplBugIru6jX-3aFXX89CaeOEo9U1LDRbHRc7R3f2WclObVEV2TjEI0DismAhYb8dzgCn_Ea-JEEiocAoWtWaOQCjylDmO2M0noDEtmzLRmDGjL3ptQNeQn-uptxVebogGVkKS1Q9QqhPbO9k5WeYYHxdbGSJIqUzsV6FykVmIPUUFyt3kCNd5gSjQoikoxzn0_2Eidghoxgxtc2Ygp7f3yKCSCM9b4SnURbx3PeVb3qDociBEg19CywgJvMUSG6Jc1EZK0XdMbXRU_BLTMEc-3fk946xQL_yK02tURblXg-crOLuD1-X4H6q5-P_DDq-93pEKlnJfLnpjojfac7aSkkRYqnucCVtuvgv9ikNf5nBdSzpK6YcwSqdpinElMORUcG6jqQFvJYTtstt35E4GTxPvZXObuFs5wdidy-R1Zbt5j9Y2KMkiq7QEWWISDEBdhVq8H3mH0WnxwEYTN27sJM7444LpjLB9DF0rP61CnXZ0P2Cv92-Fv-vqALVJcr7lU6BbQ62i_unOT4LcivIo6jdhByWyM62_HlNkwaQd7yKmTYICHQtIxIjpvA1ywc8GMD5AlQL-CyuZ4RPdfxPlI39awwaCYOuHaCuI4VNcyyx5km1MpSJrBrV6lmG6QkzEjOyfScOyyGlRau0DufPqzCGMrEs_-gIzQcCet3xBgGTUEOvXUwbPSQy9qHsVYKx0SJysytHsoGCIjv_E87zjaiI8PwbShRmMdMs37K1lCD8B_H6Hg4LCveU_vSv5bjapmSWRviG5W7YcGXPs9kolTxMfhGrQprwdmN7-TcVUNruaaGHMzs=w567-h756-s-no",
    "1684782523992",
    "1684782523992",
    "1684782523992",
  ],
  [
    "pig",
    "Philodendron Imperial Green",
    Math.round(week / 3).toString(),
    Math.round(week * 4).toString(),
    "AA6CZZgri61mz2E5fqODJcJdcWfcrMf4kT5KhqtKOjNYqdu7J_xydjDCC4FysjAXSKdkyQntyLoE",
    "https://lh3.googleusercontent.com/T-JPHDcLYryQrV388rf3YkhmntxhyrJu_dbFxSL9ytSDOISAiU4rfFm5Q_iAN78mK-T6VzvfwumfOSe2idhqKrg1CcI3pbmhSn-DYJwSFg2VkFMgw_jREKpdLkC9vlMvLujI0Wjsyeg9R_fYa5iJP-n1_0wCuwD-ieqKSTMO36A-KE8wrZgS3h-S8WNBbznPe_XrVgvKbX3x5xomlQayBqJhg-3HYZd16_mI7L73mc3PsKFam56fLcF8coxVTuYVklBsxQYkHTdZqkfZyYaznE6MsBDKUbvT2joKmtWixxmGdlSPOfl6MQa1xtAa0BdyoFKEOiVYoJJYr0tVpgyv3lIML6SS74-RLoMu9t_toLmLl8gkknWbU0aJCWMBsX4HEBlDfsxOgR7YVaWe6mJTJNeeySwW8nyj_EqrTGt5LEN9_nwEQVokhLf2_Jz8660lKU4fqCtDvttZZYU56C7o2NiGelXXWqnnQWe5u7t8AjoebIUayvwXG1Hm9wTg8EN74x1ZQ1G0ygB7NowxwM1c4kGspdS5oiHnsDjbI2QJ1keOr_Qm1ngmW5j8t__GoY-e3yX2xR66NUl7QXoE63_D-rK4hhBXKI9vQVGUU8ctRHJGgwfNyfuDaJ3IJzvcANrrBqbBWK8krV-ZuYnkRBE9TNBYsf2nGV19haCQi96kZqT_6X4MEJ5Xh0IAIPPrScwojwiGXqxabH6Y4GHo-BokRhcqr4Hb7ys48HUIIWrptdlfkVKKoYvKXzTzjsisVRGnZjyhYNNaBeaf0vahXBAzK2CXwOpe8SAnyfMhrpPHAfb7LWJFLvOQtRHXSur1KqbuFAIMgbUugwqXMrT89ot-VEJgSS51RHOfF9RevS__g3ynUccqbstPBjhUQJ7ZAicrGg-tz_JwwDBKXTqd9_tib-kABfAMt3MK0FPvt5bV5rp7QqTdYgeg46tXWI9FVOlLWpu8YD7HTeHOuwhscwvuP0d66Fd-E6QJozN1G-fD_k6lwcBsYXKaBO4=w567-h756-s-no",
    "1684355180885",
    "1684355180885",
    "1683836894702",
  ],
];

const e = async () => {
  const client = getClient();
  const range = "A1:I5";
  await client.spreadsheets.values.clear({
    spreadsheetId: spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  await client.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    includeValuesInResponse: true,
    requestBody: {
      majorDimension: "ROWS",
      values: rows,
    },
  });
};

e();
