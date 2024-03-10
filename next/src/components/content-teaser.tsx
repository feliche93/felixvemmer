import React, { FC, PropsWithChildren } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';

export interface ContentTeaserProps extends PropsWithChildren<any> {
  onSubscribe: () => void; // This should be the function that handles the subscription logic
}

export const ContentTeaser: FC<ContentTeaserProps> = ({ children }) => {
  const { isLoaded, sessionId, } = useAuth();
  if (isLoaded && sessionId) {
    // If the user is allowed, show the full content
    return <>{children}</>;
  }
  return (
    <Card className='my-4 flex flex-col items-center'>
      <CardHeader>
        <CardTitle>
          Subscribe to continue reading.
        </CardTitle>
      </CardHeader>
      <CardContent>
        Become a free member to get access to all subscriber-only content.
      </CardContent>
      <CardFooter className='gap-4'>
        <Input type="email" className='w-64' placeholder="Enter your email" />
        <Button onClick={() => { }}>Subscribe</Button>
      </CardFooter>
    </Card>
  )

};

export default ContentTeaser;