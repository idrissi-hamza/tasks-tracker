import "next-auth";
declare module "next-auth" {
  interface User {
    userId: string;
    orgId: string;
  }
  interface Session {
    user: User;
  }
}
