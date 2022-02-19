import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAsyncContacts = createAsyncThunk(
  "contact/getAsyncContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3001/contacts");
      return data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
export const postAsyncContacts = createAsyncThunk(
  "contact/postAsyncContacts",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:3001/contacts", {
        id: Math.floor(Math.random * 100),
        name: payload.name,
        email: payload.email,
      });
      return data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
export const deleteAsyncContacts = createAsyncThunk(
  "contact/deleteAsyncContacts",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);
const initialState = {
  contact: [],
  error: null,
  loading: false,
};
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action) => {
      const newContact = {
        id: Math.floor(Math.random * 100),
        name: action.payload.name,
        email: action.payload.email,
      };
      state.contact.push(newContact);
    },
    deleteContact: (state, action) => {
      const filteredContact = state.contact.filter(
        (c) => c.id !== action.payload.id
      );
      state.contact = filteredContact;
    },
  },
  extraReducers: {
    [getAsyncContacts.fulfilled]: (state, action) => {
      return { ...state, error: null, loading: false, contact: action.payload };
    },
    [getAsyncContacts.pending]: (state, action) => {
      return { ...state, error: null, loading: true, contact: [] };
    },
    [getAsyncContacts.rejected]: (state, action) => {
      return { ...state, error: action.error, loading: false, contact: [] };
    },
    [postAsyncContacts.fulfilled]: (state, action) => {
      state.contact.push(action.payload);
    },
    [deleteAsyncContacts.fulfilled]: (state, action) => {
      state.contact = state.contact.filter((c) => c.id !== action.payload.id);
    },
  },
});
export const { addContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
