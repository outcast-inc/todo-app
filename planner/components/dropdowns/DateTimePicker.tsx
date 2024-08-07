
import { Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const DateTimePickerDropdown = ({
  date,
  setDate,
}: {
  date: any,
  setDate: (date: any) => void
}) => {

  const [Open, setOpen] = useState(false);
  const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const pickerDate = new Date(date);
  
  return (
    <Popover open={Open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="bg-gray-200 p-2 rounded-md flex items-center gap-2 col-span-2">
            <Calendar className='h-5 w-5'/>
            <span className="w-fit">
                {formatter.format(pickerDate)}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="m-0 flex items-center justify-center">
            <DatePicker 
                showTimeInput
                selected={date}
                onChange={(update) => setDate(update)}
                dateFormat="MM/dd/yyyy - h:mm aa"
                className='flex items-center'
                wrapperClassName='date-picker'
                timeInputLabel="Time:"
                inline
            />
        </PopoverContent>
    </Popover>
  )
}

export default DateTimePickerDropdown