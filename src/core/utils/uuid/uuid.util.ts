import {v4 as uuidv4, v7 as uuidv7 } from 'uuid'

export class UUIDGenerator {
    
    static v4(): string{
        return uuidv4()
    }

    static v7(): string{
        return uuidv7()
    }

}