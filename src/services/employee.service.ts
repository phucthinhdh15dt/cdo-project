// @flow
import { Get, Post } from './base.service';

const { REACT_APP_AUTH_API_URL } = process.env;

export const getDocumentsAPI = () => Get('/GetDocuments');

export const getEmployeeDetailAPI = (id: number) => Get(`/employees/${id}`);

