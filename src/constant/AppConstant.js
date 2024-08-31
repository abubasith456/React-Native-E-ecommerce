

export const INPUT_RANGE_START = 0;
export const INPUT_RANGE_END = 1;
export const OUTPUT_RANGE_START = -281;
export const OUTPUT_RANGE_END = 0;
export const ANIMATION_TO_VALUE = 1;
export const ANIMATION_DURATION = 25000;

export const GOOGLE_CLIENT_ID = "613774647430-1mvh2aspqo08ng442jmqlenudt52l9fq.apps.googleusercontent.com"

export const myFcmToken = {
    _myValue: "a",

    // Getter method
    get myValue() {
        console.log('Getting myValue');
        return this._myValue;
    },

    // Setter method
    set myValue(newValue) {
        console.log('Setting myValue');
        if (newValue !== "") {
            this._myValue = newValue;
        }
    },
};


export const menuData = [
    {
        id: '1',
        icon: 'person',
        text: 'Profile',
    },
    {
        id: '2',
        icon: 'list',
        text: 'Orders',
    },
    {
        id: '3',
        icon: 'Address',
        text: 'Addresses',
    },
    {
        id: '4',
        icon: 'exit',
        text: 'Logout',
    },
    // Add more chat data items...
];


