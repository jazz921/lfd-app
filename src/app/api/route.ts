import { NextRequest, NextResponse} from "next/server";

// const protectedAPIRoutes = [
//   '/api/accounts', 
//   '/api/eyeDoctors', 
//   '/api/fetchAddDoctor',
//   '/api/fetchAddOrder',
//   '/api/fetchAllOrders',
//   '/api/fetchFrames',
//   '/api/fetchOrderById',
//   '/api/fetchTableData',
//   '/api/fetchViewAllDoctors',
//   '/api/postBulkOrder',
//   '/api/postContactUs',
//   '/api/putEditOrder',
//   '/api/putOrderExtraPair',
//   '/api/putRemakeOrder',
// ]

export default function handler(req: NextRequest, res: NextResponse) {

  // 1. Check if there is a Logged in User
  // console.log("request", req) 
  // console.log("response", res) 
  console.log('run')
  return NextResponse.json({ message: 'Handler API Route' })
}