"use client"

import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { FormFieldType } from './forms/ListForm'
import React from 'react'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Select, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import IconPicker from './IconPicker'
import ColorPicker from './ColorPicker'
import { cn } from '@/lib/utils'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    iconObject?: string,
    color?: string,
    classNames?: string,
    setColor?: (color: string) => void,
    renderSkeleton?: (field: any) => React.ReactNode,
    setIconName?: (iconName: string) => void,
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400 text-gray-900 font-medium'>
                    {iconSrc && (
                        <Image 
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            {...field}
                            className='border-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput 
                        defaultCountry='IN'
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <FormControl>
                        <DatePicker 
                            // showIcon
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName='date-picker'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select 
                        onValueChange={field.onChange}
                        defaultValue={placeholder}
                    >
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea 
                        placeholder={placeholder}
                        {...field}
                        className='bg-gray-200 w-full focus-visible:!ring-0'
                        disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className='flex items-center gap-4'>
                        <Checkbox 
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className='checkbox-label'>
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        case FormFieldType.LIST:
            return (
                <div className='flex items-center rounded-md border-0 bg-dark-400 text-gray-900 font-medium space-x-5'>
                    <IconPicker iconObject={props.iconObject!} setIconName={props.setIconName!} />
                    <FormControl className='focus:border-none hover:border-none'>
                        <Input 
                            {...field}
                            defaultValue={placeholder}
                            autoFocus={true}
                            className='flex-1 ms-3 whitespace-nowrap border-none bg-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.WORKSPACE:
            return (
                <div className='flex items-center rounded-md border-0 bg-dark-400 text-gray-900 font-medium space-x-5'>
                    <ColorPicker color={props.color!} setColor={props.setColor!}/>
                    <FormControl className='focus:border-none hover:border-none'>
                        <Input 
                            {...field}
                            defaultValue={placeholder}
                            autoFocus={true}
                            className='flex-1 ms-3 whitespace-nowrap border-none bg-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.TASK:
            return (
                <div className='flex items-center rounded-md border-0 bg-dark-400 text-gray-900 font-medium space-x-5'>
                    <FormControl className='focus:border-none hover:border-none'>
                        <div className="flex-1 ms-3 whitespace-nowrap flex items-center">
                            <Checkbox className="h-5 w-5"/>
                            <span className="font-semibold">
                                <Input 
                                    {...field}
                                    defaultValue="Task Item"
                                    autoFocus={true}
                                    className='flex-1 ms-3 whitespace-nowrap border-none bg-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0 text-lg'
                                />
                            </span>
                        </div>
                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return(
                renderSkeleton ? renderSkeleton(field) : null
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className={cn('flex-1', `${props.classNames ? props.classNames : "" }`)}>
                {fieldType !== FormFieldType.CHECKBOX  && label && (
                    <FormLabel>{label}</FormLabel>
                )}

                <RenderField field={field} props={props}/>

                <FormMessage className='shad-error' />
            </FormItem>
        )}
    />
  )
}

export default CustomFormField