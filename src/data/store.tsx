import Iterable from 'immutable'
import {
    configureStore,
    createSerializableStateInvariantMiddleware,
    isPlain
} from '@reduxjs/toolkit'
import ToastMiddleware from '../middlewares/ToastMiddleware';
import expensesSlice from './expenseSlice';


//const getEntries = (value: any) => Iterable.isImmutable((value) ? value.entries() : Object.entries(value)

const getEntries = (value: any) => Iterable.isImmutable(value) ? value.entries() : Object.entries(value)

const isSerializable = (value: any) => Iterable.isImmutable(value) || isPlain(value)



const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
})


const store = configureStore({
    reducer: {
        expensesSlice: expensesSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware),
    middleware: [serializableMiddleware],

});

export type RootState = ReturnType<typeof store.getState>;
export default store;