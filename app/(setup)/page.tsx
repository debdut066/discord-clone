import React from 'react'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import InitialModal from '@/components/modals/initial-modal';

const page = async () => {
  const profile = await initialProfile();
 
  const user = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if(user) return redirect(`/servers/${user.id}`)

  return (
    <InitialModal/>
  )
}

export default page