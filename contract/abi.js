export const abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: '_wallet',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'string',
                name: '_id',
                type: 'string'
            }
        ],
        name: 'emitNewUser',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: '_wallet',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'string',
                name: '_id',
                type: 'string'
            }
        ],
        name: 'emitWinner',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_id',
                type: 'string'
            }
        ],
        name: 'registry',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'userArray',
        outputs: [
            {
                internalType: 'string',
                name: '_ID',
                type: 'string'
            },
            {
                internalType: 'address',
                name: '_wallet',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
