import { ContactInfo } from '@/types/contact'

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  company: {
    name: 'CÔNG TY TNHH PHÚ AN PHÁT',
    address: 'KCN Tam Phước, P.Tam Phước, Đồng Nai',
    hotline: '0931 535 007'
  },
  northBranches: [
    {
      id: 'north-1',
      name: 'HẢO AN PHÁT',
      address: 'Thôn Phù Trì, Xã Quang Minh, Hà Nội',
      hotline: '0868 586 927'
    },
    {
      id: 'north-2',
      name: 'HƯNG THỊNH PHÁT',
      address: 'Thôn Chợ Nga, xã Nội Bài, Hà Nội',
      hotline: '0966 265 504'
    }
  ],
  southBranches: [
    {
      id: 'south-1',
      name: 'BẢO AN PHÁT',
      address: 'KCN Tam Phước, Phường Tam Phước, Đồng Nai',
      hotline: '0907 353 348'
    },
    {
      id: 'south-2',
      name: 'TINH NGUYÊN HẢO',
      address: 'KCN Tam Phước, Phường Tam Phước, Đồng Nai',
      hotline: '0966 265 504'
    }
  ],
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4449267878436!2d106.87445731533406!3d10.850445192277934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a415c5b7e3%3A0x5d7a3b3e3e3e3e3e!2zxJDGsOG7nW5nIHPhu5EgOSwgVGFtIFBoxrDhu5tjLCBCacOqbiBIw7JhLCDEkOG7k25nIE5haSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s'
}
