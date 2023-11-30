import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ブログの詳細事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    //parseIntは整数方にする関数
    const id: number = parseInt(req.url.split("/blog/")[1]);

    await main();
    const post = await prisma.post.findFirst({ where: { id } }); //http://localhost:3000/api/blog/2
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    // 接続を止めてあげる
    await prisma.$disconnect();
  }
};

// ブログの記事編集API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    //parseIntは整数方にする関数
    const id: number = parseInt(req.url.split("/blog/")[1]);

    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    // 接続を止めてあげる
    await prisma.$disconnect();
  }
};

// ブログの記事削除API
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    //parseIntは整数方にする関数
    const id: number = parseInt(req.url.split("/blog/")[1]);

    await main();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    // 接続を止めてあげる
    await prisma.$disconnect();
  }
};
