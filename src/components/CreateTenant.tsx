import React, { useRef, useState, useEffect } from 'react';
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Permission,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

const STEPS = 3;

export const CreateTenant = () => {
  const progress = useRef(new Animated.Value(0)).current; // 0..1

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    description: '',
    phone: '',
    email: '',

    // Branding
    logo: null as any,
    images: [] as any[],

    // Billing
    companyName: '',
    billingEmail: '',
    gstNumber: '',
  });

  useEffect(() => {
    const toValue = (step - 1) / (STEPS - 1);
    Animated.timing(progress, {
      toValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [step, progress]);

  async function ensureGalleryPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const apiLevel =
        typeof Platform.Version === 'number'
          ? Platform.Version
          : parseInt(String(Platform.Version), 10);
      const readMediaPermission =
        (PermissionsAndroid as any).PERMISSIONS?.READ_MEDIA_IMAGES ||
        'android.permission.READ_MEDIA_IMAGES';
      const readExternal = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const permissionToRequest =
        apiLevel >= 33 ? readMediaPermission : readExternal;

      // If already granted, return true
      const already = await PermissionsAndroid.check(
        permissionToRequest as Permission,
      );
      if (already) return true;

      // Request permission
      const result = await PermissionsAndroid.request(
        permissionToRequest as Permission,
        {
          title: 'Gallery Permission',
          message:
            'This app needs access to your photos to upload logos and gallery images.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        } as any,
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) return true;

      if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Photo access is blocked',
          'Open settings to allow permission.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                Alert.alert(
                  'Permission required',
                  'Please allow photo access to upload images.',
                );
              },
            },
          ],
        );

        return false;
      }

      return false;
    } catch (err) {
      console.warn('Permission request failed', err);
      return false;
    }
  }

  async function pickLogo() {
    try {
      const ok = await ensureGalleryPermission();
      if (!ok) return;

      launchImageLibrary(
        { mediaType: 'photo', selectionLimit: 1, quality: 0.8 },
        (response: any) => {
          if (response?.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setFormData(s => ({ ...s, logo: asset }));
          }
        },
      );
    } catch (err) {
      console.warn('Image picker not available', err);
    }
  }

  async function pickGallery() {
    try {
      const ok = await ensureGalleryPermission();
      if (!ok) return;

      launchImageLibrary(
        { mediaType: 'photo', selectionLimit: 5, quality: 0.8 },
        (response: any) => {
          if (response?.assets && response.assets.length > 0) {
            setFormData(s => {
              const merged = [...s.images, ...response.assets];
              // keep up to 8 images
              return { ...s, images: merged.slice(0, 8) };
            });
          }
        },
      );
    } catch (err) {
      console.warn('Image picker not available', err);
    }
  }

  function removeGalleryImage(index: number) {
    setFormData(s => ({
      ...s,
      images: s.images.filter((_: any, i: number) => i !== index),
    }));
  }

  function next() {
    setStep(s => Math.min(STEPS, s + 1));
  }

  function back() {
    setStep(s => Math.max(1, s - 1));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fbfdff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      contentContainerStyle={{}}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fbfdff" />
      <ScrollView
        contentContainerStyle={{
          padding: 18,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          paddingBottom: 140,
        }}
      >
        <View
          style={{
            width: 75,
            height: 75,
            backgroundColor: '#e0f2fe',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: 12,
          }}
        >
          <Fa6 name="graduation-cap" size={28} color="#2563eb" />
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: '800',
            color: '#1e293b',
            textAlign: 'center',
          }}
        >
          {step === 1 && 'Create Your Coaching Account'}
          {step === 2 && 'Branding & Billing'}
          {step === 3 && 'Choose Your Plan'}
        </Text>
        <Text
          style={{
            width: step === 1 ? '70%' : step === 2 ? '100%' : '90%',
            fontSize: 14,
            color: '#475569',
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: 12,
          }}
        >
          {step === 1 &&
            "Set up your academy's profile and start your journey with us."}
          {step === 2 && 'Add your branding and billing information.'}
          {step === 3 &&
            "Select the perfect foundation for your institution's digital growth."}
        </Text>

        {step === 1 && (
          <>
            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              COACHING NAME
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d8dce4',
                backgroundColor: '#f2f6fb',
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: '#1e293b',
              }}
              placeholder="e.g. Elite Scholars Academy"
              placeholderTextColor={'#999'}
            />

            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              DESCRIPTION
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d8dce4',
                backgroundColor: '#f2f6fb',
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                height: 110,
                textAlignVertical: 'top',
                color: '#1e293b',
              }}
              placeholder="Briefly describe your coaching style or focus..."
              placeholderTextColor={'#999'}
              multiline
            />

            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              PHONE NUMBER *
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#d8dce4',
                  backgroundColor: '#f2f6fb',
                  padding: 12,
                  borderRadius: 10,
                  marginRight: 8,
                }}
              >
                <Text>+91</Text>
              </View>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d8dce4',
                  backgroundColor: '#f2f6fb',
                  padding: 12,
                  borderRadius: 10,
                  fontSize: 14,
                  flex: 1,
                  color: '#1e293b',
                }}
                placeholder="000 000 0000"
                placeholderTextColor={'#999'}
                keyboardType="phone-pad"
              />
            </View>

            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              EMAIL ADDRESS
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d8dce4',
                backgroundColor: '#f2f6fb',
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: '#1e293b',
              }}
              placeholder="admin@elitescholars.com"
              placeholderTextColor={'#999'}
            />
            <View
              style={{
                marginTop: 20,
                backgroundColor: '#ffe6d9',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                alignSelf: 'center',
              }}
            >
              <Ionicons name="warning" size={16} color="#9a3d18" />
              <Text style={{ color: '#9a3d18', fontWeight: '700' }}>
                EMAIL VERIFICATION PENDING
              </Text>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={{ color: '#425064', marginTop: 10, marginBottom: 6 }}>
              Institution Logo
            </Text>
            <TouchableOpacity
              onPress={pickLogo}
              activeOpacity={0.8}
              style={{
                height: 120,
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#a3a6ac',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f4f7',
                overflow: 'hidden',
              }}
            >
              {formData.logo && formData.logo.uri ? (
                <Image
                  source={{ uri: formData.logo.uri }}
                  style={{ width: 100, height: 100, resizeMode: 'contain' }}
                />
              ) : (
                <>
                  <Text style={{ color: '#2f4aa2', fontWeight: '600' }}>
                    Upload main logo
                  </Text>
                  <Text style={{ color: '#8793a8', marginTop: 6 }}>
                    PNG, SVG up to 5MB
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={{ color: '#425064', marginTop: 12, marginBottom: 2 }}>
              Campus Gallery
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
              }}
            >
              {/* Add button */}
              <TouchableOpacity
                onPress={pickGallery}
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: '#dae6f4',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                }}
              >
                <Text style={{ color: '#6c6c6c', fontSize: 24 }}>+</Text>
              </TouchableOpacity>

              {/* Existing images */}
              {formData.images && formData.images.length > 0 ? (
                formData.images.slice(0, 6).map((img: any, idx: number) => (
                  <View key={idx} style={{ marginRight: 8 }}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        source={{ uri: img.uri }}
                        style={{ width: 64, height: 64 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeGalleryImage(idx)}
                      style={{ position: 'absolute', right: -6, top: -6 }}
                    >
                      <View
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 12,
                          padding: 2,
                          borderWidth: 1,
                          borderColor: '#eee',
                        }}
                      >
                        <Text style={{ color: '#cc0000', fontWeight: '700' }}>
                          x
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <>
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      backgroundColor: '#d9d7d3',
                      marginRight: 8,
                    }}
                  />
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      backgroundColor: '#4a6b38',
                    }}
                  />
                </>
              )}
            </View>

            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#e5e9f1',
                marginVertical: 18,
              }}
            />

            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              Company / Institution Name
            </Text>
            <TextInput
              style={{
                backgroundColor: '#f2f6fb',
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: '#1e293b',
                borderWidth: 1,
                borderColor: '#d8dce4',
              }}
              placeholder="e.g. Oakridge Academy"
              placeholderTextColor={'#999'}
            />

            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              Billing Email Address
            </Text>
            <TextInput
              style={{
                backgroundColor: '#f2f6fb',
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: '#1e293b',
                borderWidth: 1,
                borderColor: '#d8dce4',
              }}
              placeholder="finance@institution.com"
              placeholderTextColor={'#999'}
            />

            <Text
              style={{
                color: '#0a6b55',
                fontWeight: '700',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              Tax / GST Number
            </Text>
            <TextInput
              style={{
                backgroundColor: '#f2f6fb',
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: '#1e293b',
                borderWidth: 1,
                borderColor: '#d8dce4',
              }}
              placeholder="22AAAAA0000A1Z5"
              placeholderTextColor={'#999'}
            />
          </>
        )}

        {step === 3 && (
          <>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#eef3ff',
                padding: 16,
                borderRadius: 12,
                marginTop: 8,
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ color: '#1e3a8a', fontWeight: '700' }}>
                TIER 01
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '800', marginTop: 2 }}>
                FREE
              </Text>
              <Text style={{ color: '#6b7280', marginTop: 2 }}>
                Basic features for personal experimentation.
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '900', marginTop: 2 }}>
                $0{' '}
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}
                >
                  /mo
                </Text>
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#eef3ff',
                padding: 16,
                borderRadius: 12,
                marginTop: 8,
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ color: '#1e3a8a', fontWeight: '700' }}>
                TIER 02
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '800', marginTop: 2 }}>
                BASIC
              </Text>
              <Text style={{ color: '#6b7280', marginTop: 2 }}>
                Essential tools for small classrooms.
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '900', marginTop: 2 }}>
                $29{' '}
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}
                >
                  /mo
                </Text>
              </Text>
            </View>

            <View
              style={{
                borderColor: '#0b48d5',
                borderWidth: 2,
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 12,
                marginTop: 12,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -18,
                  alignSelf: 'center',
                  backgroundColor: '#0b63ff',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}
              >
                <Text style={{ color: '#fff' }}>MOST POPULAR</Text>
              </View>
              <Text style={{ color: '#1e3a8a', fontWeight: '700' }}>
                TIER 03
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '800', marginTop: 2 }}>
                PRO
              </Text>
              <Text style={{ color: '#6b7280', marginTop: 2 }}>
                Advanced analytics and management for growing schools.
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '900', marginTop: 2 }}>
                $59{' '}
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}
                >
                  /mo
                </Text>
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#eef3ff',
                padding: 16,
                borderRadius: 12,
                marginTop: 8,
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ color: '#1e3a8a', fontWeight: '700' }}>
                TIER 04
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '800', marginTop: 2 }}>
                ENTERPRISE
              </Text>
              <Text style={{ color: '#6b7280', marginTop: 2 }}>
                Custom features and dedicated support for large scale.
              </Text>
              <Text
                style={{ color: '#0b63ff', fontWeight: '700', marginTop: 2 }}
              >
                Contact Sales
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          borderTopWidth: 1,
          borderColor: '#d5d9e3',
          backgroundColor: '#FFF',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 34 : 12,
        }}
      >
        <View style={{ width: '100%', marginTop: 6, marginBottom: 14 }}>
          <Text
            style={{
              color: '#2d8a6f',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 6,
              fontWeight: '600',
            }}
          >
            STEP {step} OF {STEPS}
          </Text>
          <View
            style={{
              height: 10,
              backgroundColor: '#e9eef6',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <Animated.View
              style={[
                { height: 10, backgroundColor: '#0aa37a', borderRadius: 20 },
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
            width: '100%',
          }}
        >
          {step > 1 && (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 22,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#e2e6f0',
              }}
              onPress={back}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: '#1f2937',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          )}

          {step < STEPS ? (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#0b63ff',
                paddingVertical: 10,
                paddingHorizontal: 28,
                borderRadius: 10,
                shadowColor: '#0b63ff',
                shadowOpacity: 0.25,
                shadowRadius: 12,
              }}
              onPress={next}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: '#fff',
                  fontWeight: '800',
                  textAlign: 'center',
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#0b63ff',
                paddingVertical: 10,
                paddingHorizontal: 28,
                borderRadius: 10,
                shadowColor: '#0b63ff',
                shadowOpacity: 0.25,
                shadowRadius: 12,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: '#fff',
                  fontWeight: '800',
                  textAlign: 'center',
                }}
              >
                Create Tenant
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
