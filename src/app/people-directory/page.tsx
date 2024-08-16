
import PeopleTable from '@/components/PeopleTable'
import { FC } from 'react'

interface pageProps {
  
}

const Page: FC<pageProps> = ({}) => {
  return <div>
     <div>
            <h1 className="text-2xl font-bold mb-4">People Directory</h1>
            <PeopleTable />
        </div>
  </div>
}

export default Page