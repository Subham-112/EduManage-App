import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';

const ROLES = [
  { label: 'Administrator', value: 'owner' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Staff', value: 'staff' },
  { label: 'Student', value: 'student' },
];

interface RoleSelectorProps {
  role: "owner" | "teacher" | "staff" | "student";
  setRole: (role: "owner" | "teacher" | "staff" | "student") => void;
}

export const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {  
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#111',
        }}
      >
        I am a
      </Text>

      <View
        style={{
          backgroundColor: '#FFB800',
          borderRadius: 8,
          overflow: 'hidden',
          minWidth: 170,
          height: 40,
          justifyContent: 'center',
        }}
      >
        <Picker
          selectedValue={role}
          onValueChange={itemValue => setRole(itemValue)}
          dropdownIconColor="#111"
          style={{
            color: '#111',
            width: 170,
            height: 100,
            backgroundColor: '#FFB800',
          }}
        >
          {ROLES.map((roleItem, idx) => (
            <Picker.Item key={idx} label={roleItem.label} value={roleItem.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};
