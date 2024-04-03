import { Replace } from '@helpers/Replace';
import generate from 'bson-objectid';

export interface DeductionProps {
  id?: string;
  payrollId: string;
  description: string;
  amount: number;
}

type InputProps = Replace<DeductionProps, { id?: string }>;

export class Deduction {
  private props: DeductionProps;

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

  public get payrollId() {
    return this.props.payrollId;
  }

  public set payrollId(payrollId: string) {
    this.props.payrollId = payrollId;
  }

  public get description() {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get amount() {
    return this.props.amount;
  }

  public set amount(amount: number) {
    this.props.amount = amount;
  }
}
