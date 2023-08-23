import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },

    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "981f5a76",
      amount: 80,
      status: "success",
      email: "user123@hotmail.com",
    },
    {
      id: "6c2b90e3",
      amount: 150,
      status: "failed",
      email: "customer@email.com",
    },
    {
      id: "2c4d3f1e",
      amount: 200,
      status: "processing",
      email: "support@company.com",
    },
    {
      id: "7e9f3c2d",
      amount: 50,
      status: "pending",
      email: "info@example.org",
    },
    {
      id: "5a1b2c3d",
      amount: 75,
      status: "success",
      email: "contact@site.com",
    },
    {
      id: "8d9e7c6b",
      amount: 90,
      status: "processing",
      email: "testuser@email.com",
    },
    {
      id: "3f1e2d4c",
      amount: 110,
      status: "pending",
      email: "developer@webapp.com",
    },
    {
      id: "a1b2c3d4",
      amount: 135,
      status: "failed",
      email: "finance@business.org",
    },
    {
      id: "4b3c2d1a",
      amount: 170,
      status: "processing",
      email: "operations@company.com",
    },
    {
      id: "9a8b7c6d",
      amount: 65,
      status: "success",
      email: "designer@webstudio.net",
    },
    {
      id: "5c4d3e2f",
      amount: 220,
      status: "pending",
      email: "orders@ecommerce.com",
    },
    {
      id: "1d2e3f4g",
      amount: 45,
      status: "failed",
      email: "helpdesk@support.net",
    },
    {
      id: "6e5f4g3h",
      amount: 105,
      status: "success",
      email: "user456@gmail.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();
  // const data:Payment[] = [];
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
