import { getParcelLifecycles } from '@shared/module/htmlParcel';
export const parcelLifecycles = getParcelLifecycles((props) => `<h-edit viewid=${props.id}></h-edit>`);
