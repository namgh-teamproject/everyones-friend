import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "User",
  columns: {
    id: {
      primary: true,
      type: "text",
      generated: true,
    },
    nickname: {
      type: "text",
    },
    phonenumber: {
      type: "text",
    },
  },
});

export default User;
