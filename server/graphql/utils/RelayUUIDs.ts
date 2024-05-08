class UUIDParsingError extends Error {
  constructor(uuid: string) {
    super(`The provided id: ${uuid} could not be parsed`);
  }
}

export function CreateUUID(tableName: string, id: number) {
  return Buffer.from(`${tableName}:${id}`).toString("base64");
}

export function ParseUUID(uuid: string): {
  typeName: string;
  primaryKey: number;
} {
  const [typeName, primaryKey] = Buffer.from(uuid, "base64")
    .toString("ascii")
    .split(":");

  if (!typeName || !primaryKey) throw new UUIDParsingError(uuid);

  return { typeName, primaryKey: parseInt(primaryKey) };
}
