import { SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const groupPeopleByLastName = (_data: any) => {
    const data = [..._data];
    const groupedData = data.reduce((acc: any, item: any) => {
        const group = item.name.last[0].toUpperCase();

        if (acc[group]) {
            acc[group].data.push(item);
        } else {
            acc[group] = {
                title: group,
                data: [item],
            };
        }
        return acc;
    }, {});

    const sections = Object.keys(groupedData).map((key: any) => groupedData[key]);

    return sections.sort((a: any, b: any) => {
        if (a.title > b.title) return 1;
        return -1;
    });
}

const People = [
    {
        name: {
            title: "Mr",
            first: "John", 
            last: "Anderson",
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Sarah",
            last: "Anderson",
        }
    },
    {
        name: {
            title: "Mr",
            first: "James",
            last: "Brown",
        }
    },
    {
        name: {
            title: "Ms",
            first: "Emily",
            last: "Brown",
        }
    },
    {
        name: {
            title: "Dr",
            first: "Michael",
            last: "Brown",
        }
    },
    {
        name: {
            title: "Mr",
            first: "David",
            last: "Clark",
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Lisa",
            last: "Clark",
        }
    },
    {
        name: {
            title: "Mr",
            first: "Thomas",
            last: "Garcia",
        }
    },
    {
        name: {
            title: "Ms",
            first: "Helen",
            last: "Garcia",
        }
    },
    {
        name: {
            title: "Dr",
            first: "Robert",
            last: "Harris",
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Mary",
            last: "Harris",
        }
    },
    {
        name: {
            title: "Mr",
            first: "William",
            last: "Harris",
        }
    },
    {
        name: {
            title: "Ms",
            first: "Patricia",
            last: "Miller",
        }
    },
    {
        name: {
            title: "Mr",
            first: "Charles",
            last: "Miller",
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Barbara",
            last: "Smith",
        }
    },
    {
        name: {
            title: "Dr",
            first: "Richard",
            last: "Smith",
        }
    },
    {
        name: {
            title: "Ms",
            first: "Susan",
            last: "Smith",
        }
    },
    {
        name: {
            title: "Mr",
            first: "Joseph",
            last: "Wilson",
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Margaret",
            last: "Wilson",
        }
    },
    {
        name: {
            title: "Mr",
            first: "George",
            last: "Wilson",
        }
    }
];

const Project8 = () => {
  return (
    <SafeAreaView>
        <SectionList
            sections={groupPeopleByLastName(People)}
            keyExtractor={(item: any) => `${item.name.first}-${item.name.last}`}
            renderSectionHeader={({ section }) => {
                return (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{section.title}</Text>
                    </View>
                )
            }}
            renderItem={({ item }) => {
                return (
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                    </View>
                )
            }}
            ItemSeparatorComponent={() => {
                return (
                    <View style={styles.separator} />
                )
            }}
        />
    </SafeAreaView>
  )
}

export default Project8

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    name: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginHorizontal: 10,
    },
    sectionHeader: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "rgba(170, 170, 170)",
    }
})