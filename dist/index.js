'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var polymerElement_js = require('@polymer/polymer/polymer-element.js');

/**
 * `WhcgPeriodCompounder`
 * 
 * @customElement
 * @polymer
 */

class WhcgPeriodCompounder extends polymerElement_js.PolymerElement {
    
    static get properties() {

        return {
            period: {
                type: String,
                notify: true,
                readOnly: false,
            },
            rate: {
                type: String,
                notify: true,
                readOnly: false,
            },
            initialValue: {
                type: String,
                notify: true,
                readOnly: false,
                observer: '_initialValueChanged'
            },
            label: {
                type: String,
                notify: true,
                readOnly: false,
            },
            whcgjsonoutput: {
                type: String,
                notify: true,
                readOnly: false,
            },
            name: {
                type: String,
                notify: true,
                readOnly: false,
            },
        }
    };

    static get observers() {
        return [
            'multiplier(period, rate, initialValue)',
            'compounder(period, rate, initialValue)'
        ]
    }

    _initialValueChanged() {
        console.log('this.initialValue');
        console.log(this.initialValue);
    }

    multiplier() {
        console.log(Number(this.period) * Number(this.rate) * Number(this.initialValue));
    };

    compounder() {
        

        let startValue = JSON.parse(this.initialValue).result[0].data.cost.dataset['0'];

        let arr = new Array(Number(this.period)).fill(startValue);
        let mappedArr = arr.map((element, index) => {
            return element * Math.pow((1 + Number(this.rate)), (index + 1));
        });
       
        this.jsonBuilder(mappedArr);
    }

    jsonBuilder(mappedArr) {
        let whcgObj = {};
        whcgObj.result = [];


        function subDataFactory(item) {
            let dataobj = {};
            for (let i = 0; i < item; i++) {
                Object.assign(dataobj, {
                    [String(i)]: mappedArr[i]
                });
            }

            return dataobj;
        }

        function dataFactory(item) {
            let dataobj = {};

            Object.assign(dataobj, {
                'yearlyamounts': {
                    label: 'kr',
                    dataset: subDataFactory(item)
                }
            });

            return dataobj;
        }

        function resultElementObjFactory() {
            return {
                object: this.name,
                data: dataFactory.call(this, mappedArr.length)
            }
        }

        whcgObj.result.push(resultElementObjFactory.call(this));



        console.log('whcgObj!!!!');
        console.log(whcgObj);
        this.whcgjsonoutput = JSON.stringify(whcgObj);

        // console.log(this.whcgjsonoutput);


        // let obj = {};
        // obj.result = [];

        // let labelObj = {};
        // labelObj.label = this.label;
        // console.log(labelObj);

        
        // let keyArr = mappedArr.map((element, index) => {
        //     return 'year' + (index + 1);
        // });

        // let valueArr = mappedArr.map((element, index) => {
        //     return element;
        // });

        // let valueObj = {};
        // keyArr.forEach((key, index) => {
        //     valueObj[key] = valueArr[index];
        // });

        // //merging two objects
        // let testObj = Object.assign(labelObj, valueObj);

        // obj.result[0] = testObj;

        // this.whcgjsonoutput = JSON.stringify(obj);

        //     // console.log('keyArr');
        //     // console.log(keyArr);
        //     // console.log('valueArr');
        //     // console.log(obj); 
    };
            


    // _multiplyFields() {

    //     let assignednodes = this.$.slotid.assignedNodes();
        

    //     let filteredArr = assignednodes.filter(element => {

    //         return element.nodeName === "WHCG-NUMBER-FIELD";
    //     });
    //     let dataArr = filteredArr.map(element => element.__data);
    //     console.log(dataArr);

    //     let undefinedElement = false;

    //     dataArr.forEach(element => {
    //         if (element === undefined) {
    //             undefinedElement = true;
    //         }
    //     }) 

    //     if (!undefinedElement) {
    //         this.outputString = this.arrayMultiplier(dataArr);
    //         this.jsonBuilder(dataArr);
    //     }
        
    // };

    // jsonBuilder(dataArr) {
    //     let obj = {};
    //     obj.result = [];
    //     obj.result.push({});
    //     dataArr.forEach(element => {
    //         obj.result[0][element.label] = element.value;
    //     });
    //     this.whcgjsonoutput = JSON.stringify(obj);
    // };

    // arrayMultiplier(arr) {
    //     return arr.reduce((acc, cur) => {
    //         return acc * Number(cur.value);
    //     }, 1);
    // };

   
}

window.customElements.define('whcg-period-compounder', WhcgPeriodCompounder);

exports.WhcgPeriodCompounder = WhcgPeriodCompounder;
