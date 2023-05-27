const authToken = "123";

const albumIds = [
  "AA6CZZinMUKhP9Mi20Z1EtRf5lvAJ2XrSbtxXdFRYEvZ0P3T7iDS5pnUtEcoGapCzStEv5vL8V9C",
  "AA6CZZhByy-ihxrBvQjFtYr4VqZ91I0AYJI-IWiJUuus7arbQPERNRP4YasnW_s1YJ991HNySH6L",
  "AA6CZZiLQjinC1etY4RV5AExXVKIG7-yFUhlk12x2PVUa591icXE3FVBRn1TeKo5eFoQqTxPFZm9",
  "AA6CZZgri61mz2E5fqODJcJdcWfcrMf4kT5KhqtKOjNYqdu7J_xydjDCC4FysjAXSKdkyQntyLoE",
];

const shareAlbum = async (albumId) => {
  console.log(albumId);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  const res = await fetch(
    `https://photoslibrary.googleapis.com/v1/albums/${albumId}:share`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        sharedAlbumOptions: {
          isCollaborative: true,
          isCommentable: true,
        },
      }),
    }
  );
  if (!res.ok) {
    const x = await res.json();
    console.log(x.error.details);
    throw x;
  }
  return await res.json();
};

shareAlbum(albumIds[1])
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.error(e);
  });
