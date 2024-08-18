
import PeopleTable from '@/components/PeopleTable'
import Table from '@/components/Table'
import { FC } from 'react'

interface pageProps {

}

const Page: FC<pageProps> = ({ }) => {
  return <div>
    <div>
      <Table />
    </div>
  </div>
}

export default Page