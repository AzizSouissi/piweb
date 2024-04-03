import { Replace } from '@helpers/Replace';
import generate from 'bson-objectid';
import { Allowance } from './allowance';
import { Deduction } from './deduction';

export interface PayrollProps {
  id?: string;
  userId: string;
  month: Date;
  basicSalary: number;
  cnssdeduction: number;
  taxableSalary: number;
  irpp: number;
  css: number;
  allowances: Allowance[];
  deductions: Deduction[];
  netSalary: number;
}

type InputProps = Replace<PayrollProps, { id?: string }>;

export class Payroll {
  private props: PayrollProps;

  constructor(props: InputProps) {
    this.props = {
      ...props,
      id: props.id || generate().toHexString(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get userId() {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get month() {
    return this.props.month;
  }

  public set month(month: Date) {
    this.props.month = month;
  }

  public get basicSalary() {
    return this.props.basicSalary;
  }

  public set basicSalary(basicSalary: number) {
    this.props.basicSalary = basicSalary;
  }

  public get cnssdeduction() {
    return this.props.cnssdeduction;
  }

  public set cnssdeduction(cnssdeduction: number) {
    this.props.cnssdeduction = cnssdeduction;
  }

  public get taxableSalary() {
    return this.props.taxableSalary;
  }

  public set taxableSalary(taxableSalary: number) {
    this.props.taxableSalary = taxableSalary;
  }

  public get irpp() {
    return this.props.irpp;
  }

  public set irpp(irpp: number) {
    this.props.irpp = irpp;
  }

  public get css() {
    return this.props.css;
  }

  public set css(css: number) {
    this.props.css = css;
  }

  public get allowances() {
    return this.props.allowances;
  }

  public set allowances(allowances: Allowance[]) {
    this.props.allowances = allowances;
  }

  public get deductions() {
    return this.props.deductions;
  }

  public set deductions(deductions: Deduction[]) {
    this.props.deductions = deductions;
  }

  public get netSalary() {
    return this.props.netSalary;
  }

  public set netSalary(netSalary: number) {
    this.props.netSalary = netSalary;
  }
}
