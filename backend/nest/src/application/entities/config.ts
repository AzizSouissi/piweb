import { Replace } from '@helpers/Replace';
import generate from 'bson-objectid';

export interface ConfigProps {
  id: string;
  companyName: string;
  cnssrib: string;
  payDay: Date;
  delayPayment: number;
  cssrate: number;
}

type InputProps = Replace<
  ConfigProps,
  {
    id?: string;
  }
>;

export class Config {
  private props: ConfigProps;

  constructor(props: InputProps) {
    this.props = {
      ...props,
      id: props.id ?? generate().toHexString(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public get companyName() {
    return this.props.companyName;
  }

  public set companyName(companyName: string) {
    this.props.companyName = companyName;
  }

  public get cnssrib() {
    return this.props.cnssrib;
  }

  public set cnssrib(cnssrib: string) {
    this.props.cnssrib = cnssrib;
  }

  public get payDay() {
    return this.props.payDay;
  }

  public set payDay(payDay: Date) {
    this.props.payDay = payDay;
  }

  public get delayPayment() {
    return this.props.delayPayment;
  }

  public set delayPayment(delayPayment: number) {
    this.props.delayPayment = delayPayment;
  }

  public get cssrate() {
    return this.props.cssrate;
  }

  public set cssrate(cssrate: number) {
    this.props.cssrate = cssrate;
  }
}
