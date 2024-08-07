
import { Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import DatePicker from "react-datepicker";

const DatePickerDropdown = ({
  dateRange,
  setDateRange,
}: {
  dateRange: any[],
  setDateRange: (dateRange: any) => void
}) => {

  const [startDate, endDate] = dateRange
  const [Open, setOpen] = useState(false);
  const formatter = new Intl.DateTimeFormat('en-US');
  
  return (
    <Popover open={Open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="bg-gray-200 p-2 rounded-md flex items-center gap-2">
            <Calendar className='h-5 w-5'/>
            {startDate && formatter.format(startDate)} {(startDate && endDate) && " - "} { endDate && formatter.format(endDate)}
          </div>
        </PopoverTrigger>
        <PopoverContent className="m-0 flex items-center justify-center">
            <DatePicker 
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={setDateRange}
                className='flex items-center'
                inline
            />
        </PopoverContent>
    </Popover>
  )
}

export default DatePickerDropdown