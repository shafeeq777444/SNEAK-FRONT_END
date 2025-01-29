import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";

export const fetchDashboardDetails = createAsyncThunk(
    "dashboard",
    async (_, thunkAPI) => {
        const productObject = {};
        try {
            const response = await axiosInstance.get(`/users`);
            const all = response.data;
            const users = all.filter((x) => x.role !== "admin");
            users.forEach((user) => {
                user.order.forEach((ord) => {
                    ord.items.forEach((item) => {
                        if (productObject[item.name]) {
                            productObject[item.name] += item.quantity;
                        } else {
                            productObject[item.name] = item.quantity;
                        }
                    });
                });
            });


            const admins = all.filter((x) => x.role === "admin");
            const userss = all.filter((user) => user.order && Array.isArray(user.order));

            const totalSale = users.reduce((acc, user) => {
                return acc + user.order.reduce((accs, sorder) => accs + parseFloat(sorder.totalPrice), 0);
            }, 0);

            return {
                admins,
                usersCount: userss.length,
                totalSale,
                productObject
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
