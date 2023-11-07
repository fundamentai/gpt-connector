import { convert } from 'backend-helper-kit'

const data = [
    {
        schemaDirectory: './logic/validators/sample',
        typeOutputDirectory: './logic/types/sample'
    },
    {
        schemaDirectory: './logic/validators/user',
        typeOutputDirectory: './logic/types/user'
    }
]

convert(data)
