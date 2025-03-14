---
category: examples
group: Component
title: tooltip custom content
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/preview/tooltip-custom-content.png
order: 8-2
link: components/tooltip
---

# tooltip

通过监听`mouseenter_cell`事件，鼠标移入单元格提示单元格的维度及指标信息。通过监听`mouseleave_cell`事件，鼠标离开单元格使提示框消失。

## 关键配置

- `mouseenter_cell` 事件
- `mouseleave_cell` 事件
- `mouseleave_table` 事件

## 代码演示

```javascript livedemo template=vtable
const container = document.getElementById(CONTAINER_ID);
const popup = document.createElement('div');
Object.assign(popup.style, {
  position: 'fixed',
  width: '300px',
  backgroundColor: '#f1f1f1',
  border: '1px solid #ccc',
  padding: '20px',
  textAlign: 'left'
});
function showTooltip(infoList, x, y) {
  popup.innerHTML = '';
  popup.id = 'popup';
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  const heading = document.createElement('h4');
  heading.textContent = '数据信息';
  heading.style.margin = '0px';
  popup.appendChild(heading);
  for (let i = 0; i < infoList.length; i++) {
    const info = infoList[i];
    const info1 = document.createElement('p');
    info1.textContent = info;
    popup.appendChild(info1);
  }
  // 将弹出框添加到文档主体中
  document.body.appendChild(popup);
}

function hideTooltip() {
  if (document.body.contains(popup)) {
    document.body.removeChild(popup);
  }
}
let tableInstance;
fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/North_American_Superstore_Pivot2_data.json')
  .then(res => res.json())
  .then(data => {
    const option = {
      records: data,
      rowTree: [
        {
          dimensionKey: 'Category',
          value: 'Furniture',
          hierarchyState: 'expand',
          children: [
            {
              dimensionKey: 'Sub-Category',
              value: 'Bookcases',
              hierarchyState: 'collapse'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Chairs',
              hierarchyState: 'collapse'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Furnishings'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Tables'
            }
          ]
        },
        {
          dimensionKey: 'Category',
          value: 'Office Supplies',
          children: [
            {
              dimensionKey: 'Sub-Category',
              value: 'Appliances'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Art'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Binders'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Envelopes'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Fasteners'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Labels'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Paper'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Storage'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Supplies'
            }
          ]
        },
        {
          dimensionKey: 'Category',
          value: 'Technology',
          children: [
            {
              dimensionKey: 'Sub-Category',
              value: 'Accessories'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Copiers'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Machines'
            },
            {
              dimensionKey: 'Sub-Category',
              value: 'Phones'
            }
          ]
        }
      ],
      columnTree: [
        {
          dimensionKey: 'Region',
          value: 'West',
          children: [
            {
              value: 'Sales',
              indicatorKey: 'Sales'
            },
            {
              value: 'Profit',
              indicatorKey: 'Profit'
            }
          ]
        },
        {
          dimensionKey: 'Region',
          value: 'South',
          children: [
            {
              value: 'Sales',
              indicatorKey: 'Sales'
            },
            {
              value: 'Profit',
              indicatorKey: 'Profit'
            }
          ]
        },
        {
          dimensionKey: 'Region',
          value: 'Central',
          children: [
            {
              value: 'Sales',
              indicatorKey: 'Sales'
            },
            {
              value: 'Profit',
              indicatorKey: 'Profit'
            }
          ]
        },
        {
          dimensionKey: 'Region',
          value: 'East',
          children: [
            {
              value: 'Sales',
              indicatorKey: 'Sales'
            },
            {
              value: 'Profit',
              indicatorKey: 'Profit'
            }
          ]
        }
      ],
      rows: [
        {
          dimensionKey: 'Category',
          title: 'Catogery',
          width: 'auto'
        },
        {
          dimensionKey: 'Sub-Category',
          title: 'Sub-Catogery',
          width: 'auto'
        }
      ],
      columns: [
        {
          dimensionKey: 'Region',
          title: 'Region',
          headerStyle: {
            textStick: true
          },
          width: 'auto'
        }
      ],
      indicators: [
        {
          indicatorKey: 'Sales',
          title: 'Sales',
          width: 'auto',
          showSort: false,
          headerStyle: {
            fontWeight: 'normal'
          },
          format: value => {
            if (value) {
              return '$' + Number(value).toFixed(2);
            }
            return '';
          },
          style: {
            padding: [16, 28, 16, 28],
            color(args) {
              if (args.dataValue >= 0) {
                return 'black';
              }
              return 'red';
            }
          }
        },
        {
          indicatorKey: 'Profit',
          title: 'Profit',
          width: 'auto',
          showSort: false,
          headerStyle: {
            fontWeight: 'normal'
          },
          format: value => {
            if (value) {
              return '$' + Number(value).toFixed(2);
            }
            return '';
          },
          style: {
            padding: [16, 28, 16, 28],
            color(args) {
              if (args.dataValue >= 0) {
                return 'black';
              }
              return 'red';
            }
          }
        }
      ],
      corner: {
        titleOnDimension: 'row',
        headerStyle: {
          textStick: true
        }
      },
      widthMode: 'standard',
      rowHierarchyIndent: 20,
      rowExpandLevel: 1,
      rowHierarchyTextStartAlignment: true,
      dragOrder: {
        dragHeaderMode: 'all'
      }
    };
    tableInstance = new VTable.PivotTable(container, option);
    window.tableInstance = tableInstance;
    tableInstance.on('mouseenter_cell', args => {
      const { cellRange, col, row } = args;
      debugger;
      const value = tableInstance.getCellValue(col, row);
      const cellHeaderPaths = tableInstance.getCellHeaderPaths(col, row);
      const infoList = [];
      cellHeaderPaths.rowHeaderPaths?.forEach(headerDimension => {
        infoList.push(
          headerDimension.indicatorKey
            ? headerDimension.indicatorKey + ': ' + value
            : headerDimension.dimensionKey + ': ' + headerDimension.value
        );
      });
      cellHeaderPaths.colHeaderPaths?.forEach(headerDimension => {
        infoList.push(
          headerDimension.indicatorKey
            ? headerDimension.indicatorKey + ': ' + value
            : headerDimension.dimensionKey + ': ' + headerDimension.value
        );
      });
      const container = document.getElementById(CONTAINER_ID);
      const containerRect = container.getBoundingClientRect();

      if (!tableInstance.isHeader(col, row)) {
        showTooltip(infoList, cellRange?.left + containerRect.left, cellRange?.bottom + containerRect.top);
      } else {
        hideTooltip();
      }
    });
    tableInstance.on('mouseleave_cell', args => {
      const { cellRange, col, row } = args;
      hideTooltip();
    });
    tableInstance.on('mouseleave_table', args => {
      const { cellRange, col, row } = args;
      hideTooltip();
    });
  });
```
