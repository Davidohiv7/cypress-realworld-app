import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import {
  AuthMachineContext,
  AuthMachineEvents,
  AuthMachineSchema,
} from "../../machines/authMachine";
import { DataContext, DataEvents, DataSchema } from "../../machines/dataMachine";

export type AuthService = Interpreter<
  AuthMachineContext,
  AuthMachineSchema,
  AuthMachineEvents,
  any,
  any
>;

export type NotificationsService = Interpreter<
  DataContext,
  DataSchema,
  DataEvents,
  any,
  ResolveTypegenMeta<TypegenDisabled, DataEvents, BaseActionObject, ServiceMap>
>;
