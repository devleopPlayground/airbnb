import { NextResponse } from 'next/server';

import { auth } from './auth';

const middleware = async () => {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect('http://localhost:3000');
  }
};

export default middleware;

export const config = {
  matcher: ['/mypage'],
};
