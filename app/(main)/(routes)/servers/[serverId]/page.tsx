import React from 'react'
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current_profile';
import { redirectToSignIn } from '@clerk/nextjs';

interface ServerIdPageProps {
  params : {
    serverId : string;
  }
}

async function ServerIdPage({ params } : ServerIdPageProps){
  const profile = await currentProfile();

  if(!profile){
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where : {
      id : params.serverId,
      members : {
        some : {
          profileId : profile.id,
        }
      }
    },
    include : {
      channels : {
        where : {
          name : "general"
        },
        orderBy : {
          createdAt : "asc"
        }
      }
    }
  })

  return (
    <div>ServerIdPage</div>
  )
}

export default ServerIdPage;