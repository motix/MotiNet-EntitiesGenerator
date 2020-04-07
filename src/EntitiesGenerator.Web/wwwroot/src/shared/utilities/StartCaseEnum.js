import { Enum } from 'enumify';
import _ from 'lodash';

export default class StartCaseEnum extends Enum {
    get displayName() {
        return _.startCase(this.name);
    }
}