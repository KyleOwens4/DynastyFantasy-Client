class UUIDParsingError extends Error {
  constructor(uuid: string) {
    super(`The provided id: ${uuid} could not be parsed`);
  }
}

export function CreateUUID(tableName: string, id: number) {
  return Buffer.from(`${tableName}:${id}`).toString("base64");
}

export function ParseUUID(uuid: string): {
  tableName: string;
  primaryKey: number;
} {
  const [tableName, primaryKey] = Buffer.from(uuid, "base64")
    .toString("ascii")
    .split(":");

  if (!tableName || !primaryKey) throw new UUIDParsingError(uuid);

  return { tableName, primaryKey: parseInt(primaryKey) };
}
