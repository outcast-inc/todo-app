import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LogOut, Repeat2 } from 'lucide-react'

const UserOptions = () => {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  }

  return (
    <DropdownMenu>
          <DropdownMenuTrigger className="!outline-none">
            <Repeat2 className='h-5 w-5 text-gray-500'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuItem className="gap-2 font-medium" onClick={handleLogout}>
                  <LogOut className="flex items-center justify-center w-4 h-4 text-sm font-medium"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">LogOut</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default UserOptions