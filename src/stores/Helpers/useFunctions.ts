import Swal from 'sweetalert2'
//@ts-ignore
import validator from 'validator';
import { useDateFormat, useOnline, useTimeAgo } from '@vueuse/core';
import { createPopper, type VirtualElement } from '@popperjs/core'

type DebounceFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;


export default {
    isEmail: (email: string) => {
        return validator.isEmail(email)
    },

    isExtension: (fileName: string, requiredFormats: string[]) => {
        const regex = new RegExp('[^.]+$');
        const ext: any = fileName.match(regex);
        // get the extension
        const fileExtension = ext[0].toLowerCase()
        //make sure the file is a valid  format
        if (!(requiredFormats.some(x => x == fileExtension.toLowerCase()))) return false
        else return true
    },

    truncateStr(str: string, num: number) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    },

    toast: (text: string, icon: 'warning' | 'success' | 'error' | 'info') => {
        Swal.fire({
            toast: true,
            icon: `${icon}`,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            padding: 10,
            // iconColor: '#2c3e50',
        })
    },

    toastShort: (text: string) => {
        Swal.fire({
            toast: true,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            padding: 10,
        })
    },

    confirm: (text: string, btnText: string) => {
        return Swal.fire({
            // title: `${title}`,
            text: `${text}`,
            icon: 'question',
            iconColor: '#873A70',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#873A70',
            reverseButtons: true,
            width: '300px',
        })
    },

    confirmDelete: (text: string, btnText: string) => {
        return Swal.fire({
            // title: `${title}`,
            text: `${text}`,
            icon: 'warning',
            iconColor: '#dc3545',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#dc3545',
            reverseButtons: true,
            width: '300px',
        })
    },

    addCommas: (numb: number) => {
        const str = !numb ? ['0'] : numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    },

    isOnline: () => {
        const online = useOnline()
        return online.value;
    },

    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    debounce: <T extends (...args: any[]) => any>(func: T, delay: number): DebounceFunction<T> => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        return (...args: Parameters<T>) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    },

    greet: () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return "Good morning";
        } else if (currentTime < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    },

    dateDisplay: (date: Date, format = 'MMM D, YYYY') => {

        if (!date) return '-'
        const dd = useDateFormat(date, format)
        return dd.value
    },

    timeAgo: (date: Date) => {
        const timeAgo = useTimeAgo(date);
        return timeAgo.value;
    },

    addDaysToDate: (data: Date, num: number) => {
        const movedDate = new Date(data);
        movedDate.setDate(movedDate.getDate() + num);
        return movedDate;
    },

    vueSelectPositionCalc: (dropdownList: HTMLElement, component: { $refs: { toggle: Element | VirtualElement; }; $el: { classList: { toggle: (arg0: string, arg1: boolean) => void; }; }; }, { width }: any) => {
        dropdownList.style.width = width

        const calculatePlacement = () => {
            const rect = component.$refs.toggle.getBoundingClientRect()
            const viewportHeight = window.innerHeight

            const spaceAbove = rect.top
            const spaceBelow = viewportHeight - rect.bottom

            return spaceBelow < spaceAbove ? 'top' : 'bottom'
        }

        const placement = calculatePlacement()

        const popper = createPopper(component.$refs.toggle, dropdownList, {
            placement: placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, -1],
                    },
                },
                {
                    name: 'toggleClass',
                    enabled: true,
                    phase: 'write',
                    fn({ state }) {
                        component.$el.classList.toggle(
                            'drop-up',
                            state.placement === 'top'
                        )
                    },
                },
            ],
        })

        return () => popper.destroy()
    },


    arrayPropSum(array: any[], prop: string) {
        return array.reduce((total: number, array: any) => total + parseFloat(array[prop]), 0)
    },
}