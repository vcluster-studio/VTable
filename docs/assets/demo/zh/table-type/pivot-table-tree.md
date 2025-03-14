---
category: examples
group: table-type
title: 透视表格树形展示
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/preview/pivot-tree.png
link: table_type/Pivot_table/pivot_table_tree
option: PivotTable#rowHierarchyType('grid'%20%7C%20'tree')
---

# 透视表格树形展示（自定义表头结构）

透视表格树形展示，该示例传入了自定义表头树结构 rowTree 和 columnTree，设置 rowHierarchyType 为 tree。

需要注意的是 indicatorsAsCol 不能设置为 false，因为目前不支持当展示为 tree 结构的表头时指标在行表头上。

## 关键配置

- `PivotTable` 表格类型
- `rowHierarchyType` 将层级展示设置为`tree`，默认为平铺模式`grid`。
- `columnTree` 自定义表头树结构
- `rowTree` 自定义表头树结构
- `columns` 可选 配置维度的样式等
- `rows`可选 配置维度的样式等
- `indicators` 指标配置

## 代码演示

```javascript livedemo template=vtable
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
            if (value) return '$' + Number(value).toFixed(2);
            return '';
          },
          style: {
            padding: [16, 28, 16, 28],
            color(args) {
              if (args.dataValue >= 0) return 'black';
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
            if (value) return '$' + Number(value).toFixed(2);
            return '';
          },
          style: {
            padding: [16, 28, 16, 28],
            color(args) {
              if (args.dataValue >= 0) return 'black';
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
      rowHierarchyType: 'tree',
      widthMode: 'standard',
      rowHierarchyIndent: 20,
      rowExpandLevel: 1,
      rowHierarchyTextStartAlignment: true,
      dragOrder: {
        dragHeaderMode: 'all'
      }
    };
    tableInstance = new VTable.PivotTable(document.getElementById(CONTAINER_ID), option);
    window['tableInstance'] = tableInstance;
  });
```
