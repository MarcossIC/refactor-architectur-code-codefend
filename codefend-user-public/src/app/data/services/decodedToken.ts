function base64UrlDecode(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf-8");
}

export const decodePayload: (token: string) => any = (token: string) => {
  const [, payloadBase64] = token.split(".");

  if (!payloadBase64) {
    console.error("Token inválido");
    return null;
  }

  try {
    const decodedPayload = JSON.parse(base64UrlDecode(payloadBase64));

    console.log("decoded:", { decodedPayload });
    return decodedPayload;
  } catch (error) {
    console.error("Error al decodificar el payload:", error);
    return null;
  }
};
