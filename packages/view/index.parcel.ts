
import { getParcelLifecycles } from '@shared/module/htmlParcel';
export const parcelLifecycles = getParcelLifecycles((props) => `<h-view gutter="4" viewid=${props.id}></h-view>`);